export type Project = {
    name: string;
    host: string;
    link: string;
    image: string;
}

export type Cacheable = {
    endDate: string;
}

export type GithubRepo = {
    id: number;
    name: string;
    description: string;
    forks: number;
    stargazers_count: number;
    url: string;
    html_url: string;
    languages_url: string;
    languages?: Array<string>; // use it for downloaded lanugages
    lastDateFetched?: number;
};

export type GithubProject = GithubRepo & Project;

export type CachedProject = { project: GithubProject[] } & Cacheable ;

export type Tech = {
    name: string
    url?: string;
};

export type RepoStructure = {
    id: number;
    title: string;
    link: string;
    image: string;
    techList: Array<Tech>;
    description: string;
    forks: number;
    stars: number;
    repo: {
        link: string;
        name: string;
    }
};

export type ProjectsState = {
    projects: Array<RepoStructure> | null;
    error: Error | null;
};

export as namespace PROJECTS;
