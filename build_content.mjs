import fs from 'fs';

const scraped = JSON.parse(fs.readFileSync('all_projects_scraped.json', 'utf8'));

let ts = `/**
 * Project detail page content for all 31 projects.
 * Extracted directly from original site to ensure 1:1 structural layout match.
 */

import type { ProjectSection } from "../components/portfolio/ProjectSections";

interface ProjectData {
  title: string;
  sections: ProjectSection[];
}

export const projectContent: Record<string, ProjectData> = {
`;

for (const [slug, data] of Object.entries(scraped)) {
  ts += `  "${slug}": ${JSON.stringify(data, null, 4)},\n`;
}

ts += `};\n`;

fs.writeFileSync('src/app/data/projectContent.ts', ts);
console.log('Successfully wrote projectContent.ts');
