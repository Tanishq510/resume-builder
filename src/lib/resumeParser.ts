import { v4 as uuid } from "uuid";
import {
  CertificateEntry,
  EducationEntry,
  ExperienceEntry,
  PersonalInfo,
  ProjectEntry,
  SkillGroup,
} from "@/types/resume";

export interface ParsedResume {
  personalInfo: Partial<PersonalInfo>;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  certificates: CertificateEntry[];
  achievements: string[];
}

const SECTION_ALIASES = {
  summary: ["summary", "objective", "profile", "about me", "about"],
  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment history",
    "employment",
    "work history",
  ],
  education: ["education", "academic background", "academics"],
  skills: [
    "skills",
    "technical skills",
    "core competencies",
    "key skills",
    "skills & tools",
  ],
  projects: [
    "projects",
    "personal projects",
    "key projects",
    "project experience",
  ],
  certificates: [
    "certificates",
    "certifications",
    "certification",
    "licenses",
    "licenses & certifications",
    "certifications & licenses",
    "licenses and certifications",
  ],
  achievements: [
    "achievements",
    "awards",
    "awards & honors",
    "honors",
    "honors & awards",
    "accomplishments",
  ],
} as const;

type SectionId = keyof typeof SECTION_ALIASES;

const MONTHS =
  "jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december";
const DATE_TOKEN = `(?:(?:${MONTHS})[a-z]*\\.?\\s*)?\\d{4}|\\d{1,2}\\/\\d{4}`;
const DATE_RANGE_RE = new RegExp(
  `(${DATE_TOKEN})\\s*(?:-|–|—|to)\\s*(${DATE_TOKEN}|present|current)`,
  "i"
);
const SINGLE_DATE_RE = new RegExp(`${DATE_TOKEN}`, "i");

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i;
const PHONE_RE = /(\+?\(?\d[\d\s().-]{7,}\d\)?)/;
const LINKEDIN_RE = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,;|)]+/i;
const URL_RE =
  /(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:com|dev|io|net|org|me|co)[^\s,;|)]*/i;
const BULLET_RE = /^[\s]*[•\-*▪‣●○◦·]\s*/;
const LOCATION_RE =
  /\b([A-Z][a-zA-Z.]+(?:\s[A-Z][a-zA-Z.]+)*,\s*[A-Z]{2}\b|[Rr]emote|[Hh]ybrid|[Oo]nline|[Oo]n-?site)\b/;
// Broader than LOCATION_RE (which only matches "City, XX" US state codes) —
// used only where a whole line must match, so the bigger surface (any
// "City, Region/Country" pair) doesn't risk misreading ordinary text
// elsewhere, e.g. "Product Manager, Global Sales" as a location.
const STANDALONE_LOCATION_RE =
  /^(?:[A-Z][A-Za-z.'-]*(?:\s[A-Z][A-Za-z.'-]*)*,\s*[A-Z][A-Za-z.'-]*(?:\s[A-Z][A-Za-z.'-]*)*|[Rr]emote|[Hh]ybrid|[Oo]nline|[Oo]n-?site)$/;

function cleanLine(line: string): string {
  return line.replace(/\s+/g, " ").trim();
}

/**
 * Markdown resumes commonly use "#"/"##" for section headers and "**bold**"
 * for names/titles — strip that syntax so it doesn't leak into parsed
 * values (e.g. a "## Experience" header needs to read as "Experience" to
 * match SECTION_ALIASES).
 */
function stripMarkdownSyntax(line: string): string {
  return line
    .replace(/^#{1,6}\s*/, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1");
}

function stripBullet(line: string): string {
  return cleanLine(line.replace(BULLET_RE, ""));
}

/**
 * Groups raw lines into bullets. PDF text extraction puts each wrapped
 * visual line on its own row, so a single long bullet often arrives as
 * several lines — only the first carries a bullet marker. When at least
 * one line in the block has a marker, unmarked lines are folded into the
 * previous bullet as wrapped continuations; otherwise every line is kept
 * as its own bullet (resumes that omit bullet markers entirely).
 */
function groupBulletLines(lines: string[]): string[] {
  const hasMarkers = lines.some((l) => BULLET_RE.test(l));
  const bullets: string[] = [];
  for (const line of lines) {
    const isNewBullet = !hasMarkers || BULLET_RE.test(line) || bullets.length === 0;
    const cleaned = stripBullet(line);
    if (isNewBullet) {
      bullets.push(cleaned);
    } else {
      bullets[bullets.length - 1] = cleanLine(
        `${bullets[bullets.length - 1]} ${cleaned}`
      );
    }
  }
  return bullets.filter(Boolean);
}

/** Pulls a location/work-mode token (e.g. "Austin, TX", "Remote") out of a
 * line, returning what's left after removing it. */
function extractLocationFromLine(line: string) {
  const match = line.match(LOCATION_RE);
  if (!match) return { location: "", remainder: line };
  return {
    location: match[0],
    remainder: cleanLine(
      line.replace(match[0], "").replace(/^[\s,;–—-]+|[\s,;–—-]+$/g, "")
    ),
  };
}

/** Removes parens left empty after their contents (a date, a link, ...)
 * were stripped out of a line, e.g. "Acme Corp ()" -> "Acme Corp". */
function stripEmptyParens(text: string): string {
  return cleanLine(text.replace(/\(\s*\)/g, ""));
}

function extractDateRange(text: string) {
  const match = text.match(DATE_RANGE_RE);
  if (!match) return null;
  const [full, start, end] = match;
  const current = /present|current/i.test(end);
  return {
    start: cleanLine(start),
    end: current ? "" : cleanLine(end),
    current,
    cleaned: stripEmptyParens(text.replace(full, "")),
  };
}

function isHeaderLine(line: string): SectionId | null {
  const normalized = cleanLine(line)
    .toLowerCase()
    .replace(/[:\-–—]+$/, "")
    .trim();
  if (!normalized || normalized.length > 60) return null;
  // Letter-spaced headings ("S U M M A R Y") are common in styled resumes —
  // compare with internal whitespace collapsed out so they still match.
  const compact = normalized.replace(/\s+/g, "");
  for (const [section, aliases] of Object.entries(SECTION_ALIASES)) {
    if (
      (aliases as readonly string[]).some(
        (alias) => alias.replace(/\s+/g, "") === compact
      )
    ) {
      return section as SectionId;
    }
  }
  return null;
}

function splitSections(lines: string[]) {
  const sections: Partial<Record<SectionId, string[]>> = {};
  let current: SectionId | null = null;
  const preamble: string[] = [];

  for (const rawLine of lines) {
    const header = isHeaderLine(rawLine);
    if (header) {
      current = header;
      sections[header] = sections[header] ?? [];
      continue;
    }
    if (current) {
      sections[current]!.push(rawLine);
    } else {
      preamble.push(rawLine);
    }
  }

  return { sections, preamble };
}

function groupIntoBlocks(lines: string[]): string[][] {
  const nonEmpty = lines.filter((l) => cleanLine(l).length > 0);
  if (nonEmpty.length === 0) return [];

  const blankSeparated: string[][] = [];
  let block: string[] = [];
  let sawBlank = false;
  for (const line of lines) {
    if (cleanLine(line).length === 0) {
      sawBlank = true;
      if (block.length) {
        blankSeparated.push(block);
        block = [];
      }
      continue;
    }
    block.push(line);
  }
  if (block.length) blankSeparated.push(block);
  if (sawBlank && blankSeparated.length > 1) return blankSeparated;

  const dateSeparated: string[][] = [];
  let current: string[] = [];
  for (const line of nonEmpty) {
    if (DATE_RANGE_RE.test(line) && current.length) {
      dateSeparated.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) dateSeparated.push(current);
  return dateSeparated.length ? dateSeparated : [nonEmpty];
}

function parsePersonalInfo(
  text: string,
  preamble: string[]
): Partial<PersonalInfo> {
  const email = text.match(EMAIL_RE)?.[0] ?? "";
  const phone = text.match(PHONE_RE)?.[0]?.trim() ?? "";
  const linkedin = text.match(LINKEDIN_RE)?.[0] ?? "";

  let website = "";
  const urlMatches = text.match(new RegExp(URL_RE, "gi")) ?? [];
  for (const candidate of urlMatches) {
    const lower = candidate.toLowerCase();
    if (lower.includes("linkedin.com")) continue;
    // Skip fragments of the email's domain (e.g. "email.com" inside
    // "jordan@email.com") picked up because the URL pattern has no
    // way to see the "@" that precedes them.
    if (email && email.toLowerCase().endsWith(lower)) continue;
    website = candidate;
    break;
  }

  const location = text.match(LOCATION_RE)?.[0] ?? "";

  const cleanedPreamble = preamble.map(cleanLine).filter(Boolean);
  const nameLine = cleanedPreamble.find(
    (l) =>
      l.length > 0 &&
      l.length < 60 &&
      !EMAIL_RE.test(l) &&
      !PHONE_RE.test(l) &&
      !/https?:\/\//i.test(l)
  );

  const jobTitleLine = cleanedPreamble
    .filter((l) => l !== nameLine)
    .find(
      (l) =>
        l.length > 0 &&
        l.length < 60 &&
        !EMAIL_RE.test(l) &&
        !PHONE_RE.test(l) &&
        !/https?:\/\//i.test(l) &&
        !LOCATION_RE.test(l)
    );

  return {
    fullName: nameLine ?? "",
    jobTitle: jobTitleLine ?? "",
    email,
    phone,
    location,
    linkedin,
    website,
  };
}

function splitRoleCompany(headerText: string) {
  const location = headerText.match(LOCATION_RE)?.[0] ?? "";
  const withoutLocation = cleanLine(headerText.replace(LOCATION_RE, ""));
  const parts = withoutLocation
    .split(/,| at | @ |\||–|—|-{1,2}(?=\s)/)
    .map((p) => cleanLine(p).replace(/[-–—]+$/, "").trim())
    .filter(Boolean);

  return {
    role: parts[0] ?? withoutLocation,
    company: parts[1] ?? "",
    location,
  };
}

/**
 * Pulls a standalone location line (e.g. "Austin, TX" or "Remote") off the
 * front of `lines`, but only if that line is *entirely* consumed by the
 * match — a bullet that merely mentions a city part-way through is left
 * alone. Returns the location (if any) and the remaining lines.
 */
function takeStandaloneLocation(lines: string[]) {
  if (!lines.length) return { location: "", rest: lines };
  const line = cleanLine(lines[0]);
  if (line && STANDALONE_LOCATION_RE.test(line) && !DATE_RANGE_RE.test(line)) {
    return { location: line, rest: lines.slice(1) };
  }
  return { location: "", rest: lines };
}

function parseExperience(lines: string[]): ExperienceEntry[] {
  const blocks = groupIntoBlocks(lines);
  return blocks
    .map((block) => {
      const nonEmptyBlock = block.map(cleanLine).filter(Boolean);
      if (nonEmptyBlock.length === 0) return null;

      // Line 0 is assumed to carry the role/company (dates may or may not
      // be inline with it). A standalone location line and/or a standalone
      // date line can each optionally follow, in either order, before the
      // bullets start — resumes vary a lot in how they lay this out.
      const roleCompanyLine = nonEmptyBlock[0];
      let rest = nonEmptyBlock.slice(1);

      let take = takeStandaloneLocation(rest);
      let standaloneLocation = take.location;
      rest = take.rest;

      let dateLine = "";
      if (rest.length && DATE_RANGE_RE.test(rest[0])) {
        dateLine = rest[0];
        rest = rest.slice(1);
      }

      if (!standaloneLocation) {
        take = takeStandaloneLocation(rest);
        standaloneLocation = take.location;
        rest = take.rest;
      }

      let bodyLines = rest;

      const dateInfo = extractDateRange(dateLine || roleCompanyLine);
      const roleCompanySource = dateLine
        ? roleCompanyLine
        : dateInfo?.cleaned ?? roleCompanyLine;
      const { role, company, location: inlineLocation } =
        splitRoleCompany(roleCompanySource);

      let location = inlineLocation || standaloneLocation;

      // A standalone location line can also appear right before the
      // bullets (after the date), in resumes laid out that way.
      if (!location && bodyLines.length) {
        const take = takeStandaloneLocation(bodyLines);
        if (take.location) {
          location = take.location;
          bodyLines = take.rest;
        }
      }

      const bullets = groupBulletLines(
        bodyLines.filter((l) => !DATE_RANGE_RE.test(l) || bodyLines.length === 1)
      );

      if (!role && !company && bullets.length === 0) return null;

      const entry: ExperienceEntry = {
        id: uuid(),
        company,
        role,
        location,
        startDate: dateInfo?.start ?? "",
        endDate: dateInfo?.end ?? "",
        current: dateInfo?.current ?? false,
        bullets: bullets.length ? bullets : [""],
      };
      return entry;
    })
    .filter((e): e is ExperienceEntry => e !== null);
}

const DEGREE_RE =
  /\b(b\.?s\.?|b\.?a\.?|b\.?f\.?a\.?|m\.?s\.?|m\.?a\.?|mba|ph\.?d\.?|bachelor'?s?|master'?s?|associate'?s?|diploma|certificate)\b/i;
const SCHOOL_KEYWORD_RE = /\b(university|college|institute|school|academy)\b/i;

/**
 * Education entries don't reliably lead with a date the way work-experience
 * entries do (the date is often the trailing line), so date-triggered
 * splitting misfires here. Split on a new degree/school line instead.
 */
function groupEducationBlocks(lines: string[]): string[][] {
  const nonEmpty = lines.filter((l) => cleanLine(l).length > 0);
  if (nonEmpty.length === 0) return [];

  const blankSeparated: string[][] = [];
  let block: string[] = [];
  let sawBlank = false;
  for (const line of lines) {
    if (cleanLine(line).length === 0) {
      sawBlank = true;
      if (block.length) {
        blankSeparated.push(block);
        block = [];
      }
      continue;
    }
    block.push(line);
  }
  if (block.length) blankSeparated.push(block);
  if (sawBlank && blankSeparated.length > 1) return blankSeparated;

  const keywordSeparated: string[][] = [];
  let current: string[] = [];
  for (const line of nonEmpty) {
    const startsNewEntry =
      (DEGREE_RE.test(line) || SCHOOL_KEYWORD_RE.test(line)) &&
      current.length > 0;
    if (startsNewEntry) {
      keywordSeparated.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) keywordSeparated.push(current);
  return keywordSeparated.length ? keywordSeparated : [nonEmpty];
}

function parseEducation(lines: string[]): EducationEntry[] {
  const blocks = groupEducationBlocks(lines);
  return blocks
    .map((block) => {
      const nonEmptyBlock = block.map(cleanLine).filter(Boolean);
      if (nonEmptyBlock.length === 0) return null;

      const fullText = nonEmptyBlock.join(" ");
      const dateInfo = extractDateRange(fullText);

      // The "main" line carries the degree and/or school, commonly as
      // "Degree, Field - School" (matches this app's own PDF/preview output).
      const mainLineIndex = nonEmptyBlock.findIndex(
        (l) => DEGREE_RE.test(l) || SCHOOL_KEYWORD_RE.test(l)
      );
      const resolvedMainIndex = mainLineIndex >= 0 ? mainLineIndex : 0;
      const mainLine = nonEmptyBlock[resolvedMainIndex];

      const mainWithoutDate = extractDateRange(mainLine)?.cleaned ?? mainLine;
      const mainLocationInfo = extractLocationFromLine(mainWithoutDate);
      let location = mainLocationInfo.location;
      const mainRemainder = mainLocationInfo.location
        ? mainLocationInfo.remainder
        : mainWithoutDate;

      let degree = "";
      let field = "";
      let school = "";
      const dashParts = mainRemainder
        .split(/\s[-–—]\s/)
        .map(cleanLine)
        .filter(Boolean);
      if (dashParts.length > 1) {
        const [degreeFieldPart, schoolPart] = dashParts;
        const degreeFieldParts = degreeFieldPart
          .split(",")
          .map(cleanLine)
          .filter(Boolean);
        degree = degreeFieldParts[0] ?? "";
        field = degreeFieldParts[1] ?? "";
        school = schoolPart;
      } else if (SCHOOL_KEYWORD_RE.test(mainRemainder)) {
        school = mainRemainder;
      } else {
        const parts = mainRemainder.split(",").map(cleanLine).filter(Boolean);
        degree = parts[0] ?? "";
        field = parts[1] ?? "";
      }

      const detailLines: string[] = [];
      nonEmptyBlock.forEach((rawLine, i) => {
        if (i === resolvedMainIndex) return;
        const withoutDate = extractDateRange(rawLine)?.cleaned ?? rawLine;
        if (!withoutDate) return;
        const { location: lineLocation, remainder } =
          extractLocationFromLine(withoutDate);
        if (!location && lineLocation) location = lineLocation;
        const leftover = lineLocation ? remainder : withoutDate;
        if (leftover) detailLines.push(stripBullet(leftover));
      });

      if (!school && !degree) return null;

      const entry: EducationEntry = {
        id: uuid(),
        school,
        degree,
        field,
        location,
        startDate: dateInfo?.start ?? "",
        endDate: dateInfo?.current ? "" : dateInfo?.end ?? "",
        details: detailLines.join(", "),
      };
      return entry;
    })
    .filter((e): e is EducationEntry => e !== null);
}

const SKILL_GROUP_LABEL_RE = /^([A-Za-z][A-Za-z0-9 &/+#-]{1,30}):\s*(.+)$/;

function splitSkillList(text: string): string[] {
  return Array.from(
    new Set(
      text
        .split(/,|\||•|;|\n/)
        .map((s) => cleanLine(s).replace(/-$/, "").trim())
        .filter((s) => s.length > 1 && s.length < 40)
    )
  );
}

/**
 * Resumes sometimes bucket skills under inline labels ("Languages: Java,
 * Python"), one per line — treat those as named groups. Everything else
 * (plain comma/pipe-separated lines) is pooled into a single unlabeled
 * group so ungrouped resumes still come through as one flat list.
 */
function parseSkills(lines: string[]): SkillGroup[] {
  const groups: SkillGroup[] = [];
  const ungrouped: string[] = [];

  for (const rawLine of lines) {
    const line = stripBullet(rawLine);
    if (!line) continue;
    const match = line.match(SKILL_GROUP_LABEL_RE);
    if (match) {
      const groupSkills = splitSkillList(match[2]);
      if (groupSkills.length) {
        groups.push({ id: uuid(), name: cleanLine(match[1]), skills: groupSkills });
        continue;
      }
    }
    ungrouped.push(line);
  }

  const flatSkills = splitSkillList(ungrouped.join(", "));
  if (flatSkills.length) {
    groups.push({ id: uuid(), name: "", skills: flatSkills });
  }

  return groups;
}

function parseAchievements(lines: string[]): string[] {
  return groupBulletLines(lines);
}

function parseCertificates(lines: string[]): CertificateEntry[] {
  const blocks = groupIntoBlocks(lines);
  return blocks
    .map((block) => {
      const nonEmptyBlock = block.map(cleanLine).filter(Boolean);
      if (nonEmptyBlock.length === 0) return null;

      const fullText = nonEmptyBlock.join(" ");
      const link = fullText.match(URL_RE)?.[0] ?? "";
      const rangeInfo = extractDateRange(fullText);
      const date = rangeInfo?.start ?? fullText.match(SINGLE_DATE_RE)?.[0] ?? "";

      const headerLine = stripBullet(nonEmptyBlock[0]);
      const withoutDate = stripEmptyParens(
        (rangeInfo?.cleaned ?? headerLine).replace(SINGLE_DATE_RE, "")
      );
      const withoutLink = stripEmptyParens(withoutDate.replace(URL_RE, ""));

      const parts = withoutLink
        .split(/,| - | – | — /)
        .map(cleanLine)
        .filter(Boolean);

      const name = parts[0] ?? "";
      const issuer = parts[1] ?? "";

      if (!name) return null;

      const entry: CertificateEntry = {
        id: uuid(),
        name,
        issuer,
        date: cleanLine(date),
        link,
      };
      return entry;
    })
    .filter((c): c is CertificateEntry => c !== null);
}

function parseProjects(lines: string[]): ProjectEntry[] {
  const blocks = groupIntoBlocks(lines);
  return blocks
    .map((block) => {
      const nonEmptyBlock = block.map(cleanLine).filter(Boolean);
      if (nonEmptyBlock.length === 0) return null;

      const headerLine = nonEmptyBlock[0];
      const link =
        headerLine.match(URL_RE)?.[0] ??
        nonEmptyBlock.join(" ").match(URL_RE)?.[0] ??
        "";
      const name = cleanLine(headerLine.replace(URL_RE, "").replace(/[()]/g, ""));

      const bullets = groupBulletLines(nonEmptyBlock.slice(1)).filter(
        (l) => l && l !== link
      );

      if (!name) return null;

      const entry: ProjectEntry = {
        id: uuid(),
        name,
        link,
        bullets: bullets.length ? bullets : [""],
      };
      return entry;
    })
    .filter((e): e is ProjectEntry => e !== null);
}

export function parseResumeText(text: string): ParsedResume {
  const lines = text.split(/\r?\n/).map(stripMarkdownSyntax);
  const { sections, preamble } = splitSections(lines);

  const personalInfo = parsePersonalInfo(text, preamble);
  if (sections.summary?.length) {
    personalInfo.summary = sections.summary
      .map(cleanLine)
      .filter(Boolean)
      .join(" ");
  }

  return {
    personalInfo,
    experience: sections.experience ? parseExperience(sections.experience) : [],
    education: sections.education ? parseEducation(sections.education) : [],
    skills: sections.skills ? parseSkills(sections.skills) : [],
    projects: sections.projects ? parseProjects(sections.projects) : [],
    certificates: sections.certificates
      ? parseCertificates(sections.certificates)
      : [],
    achievements: sections.achievements
      ? parseAchievements(sections.achievements)
      : [],
  };
}
