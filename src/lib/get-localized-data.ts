import { Language, BlogPost, Education, Experience, Project, ProjectDetail, SkillCategory } from "@/types";

// API helper functions - these fetch from the backend
const API_BASE = typeof window !== 'undefined' ? '' : 'http://localhost:3001';

export async function getBlogPosts(language: Language): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE}/api/blogs?lang=${language}`);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(language: Language, postId: number): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_BASE}/api/blogs/${postId}?lang=${language}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getProjects(language: Language): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE}/api/projects?lang=${language}`);
    if (!response.ok) throw new Error("Failed to fetch projects");
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectDetail(language: Language, projectId: string): Promise<ProjectDetail | null> {
  try {
    const response = await fetch(`${API_BASE}/api/projects/${projectId}?lang=${language}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching project detail:", error);
    return null;
  }
}

export async function getEducation(language: Language): Promise<Education[]> {
  try {
    const response = await fetch(`${API_BASE}/api/education?lang=${language}`);
    if (!response.ok) throw new Error("Failed to fetch education");
    return await response.json();
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
}

export async function getExperience(language: Language): Promise<Experience[]> {
  try {
    const response = await fetch(`${API_BASE}/api/experiences?lang=${language}`);
    if (!response.ok) throw new Error("Failed to fetch experience");
    return await response.json();
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}

export async function getSkills(language: Language): Promise<{ categories: SkillCategory[] }> {
  try {
    const response = await fetch(`${API_BASE}/api/skills?lang=${language}`);
    if (!response.ok) throw new Error("Failed to fetch skills");
    const categories = await response.json();
    return { categories };
  } catch (error) {
    console.error("Error fetching skills:", error);
    return { categories: [] };
  }
}

export async function getSettings() {
  try {
    const response = await fetch(`${API_BASE}/api/settings`, {
      cache: 'no-store' // Always get fresh settings
    });
    if (!response.ok) throw new Error("Failed to fetch settings");
    return await response.json();
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

// Deprecated functions for backwards compatibility
export function getProjectDetails(language: Language): Record<string, ProjectDetail> {
  console.warn("getProjectDetails is deprecated. Use getProjectDetail instead.");
  return {};
}
