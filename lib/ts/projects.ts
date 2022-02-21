import fs from "fs";
import path from "path";
import { isRight } from "fp-ts/Either";

import { HttpClient } from "./http";

const projectsList: PROJECTS.Project[] = [
    {
        name: "origin-hugo-theme",
        host: "github",
        link: "https://asleeppiano.gitlab.io/origin-hugo-site",
        image: "/static/images/origin-hugo-theme/origin-hugo-theme.png",
    },
    {
        name: "11ty-starter",
        host: "github",
        link: "https://moody-person.github.io/11ty-starter",
        image: "/static/images/11ty-starter/11ty-starter.png",
    },
    {
        name: "http-client",
        host: "github",
        link: "https://www.npmjs.com/package/@asleeppiano/http-client",
        image: ''
    },
];

const GITHUB_API_URL = "https://api.github.com";
const client = new HttpClient("axios");
const cacheDir = path.resolve(__dirname, "../../_cache");
const cacheDest = path.resolve(cacheDir, "projects.json");

function isGithubRepoAndProject(
    repo: PROJECTS.GithubProject | unknown
): repo is PROJECTS.GithubProject {
    return (repo as PROJECTS.GithubRepo).stargazers_count !== undefined;
}

function notNull<T>(val: T | null): val is T {
    return val !== null;
}

function createTech(languages: any): Array<PROJECTS.Tech> {
    return Object.keys(languages).map((lang) => ({
        name: lang.toLowerCase(),
    }));
}

function adaptGithubRepo(repo: PROJECTS.GithubRepo & PROJECTS.Project) {
    return {
        id: repo.id,
        title: repo.name,
        techList: createTech(repo.languages),
        description: repo.description,
        forks: repo.forks,
        stars: repo.stargazers_count,
        link: repo.link,
        image: repo.image,
        repo: {
            link: repo.url,
            name: "github",
        },
    };
}

function adaptToRepoStructure(
    repos: Array<PROJECTS.GithubProject> | null
): Array<PROJECTS.RepoStructure> {
    if (repos) {
        return repos.map((repo) => {
            if (isGithubRepoAndProject(repo)) {
                return adaptGithubRepo(repo);
            }
            return repo;
        });
    }
    return [];
}

// const readPreviousProjects() {
//     fs.readFileSync()
// }

export async function fetchGithubProjects(): Promise<
    Array<PROJECTS.RepoStructure>
> {
    const repos = await client
        .url(`${GITHUB_API_URL}/users/moody-person/repos`)
        .read<PROJECTS.GithubRepo[]>();

    if (isRight(repos)) {
        const filteredRepos: Array<PROJECTS.GithubProject> = repos.right
            .filter((repo) =>
                projectsList.some(
                    (project) =>
                        repo.name === project.name && project.host === "github"
                )
            )
            .map((repo) => {
                const currProject = projectsList.find(
                    (project) =>
                        project.name === repo.name && project.host === "github"
                );
                if (currProject) {
                    return { ...repo, ...currProject };
                }
                return null;
            })
            .filter(notNull);

        const langPromises = [];
        for (let repo of filteredRepos) {
            const langPromise = client.url(repo.languages_url).read<string[]>();
            langPromises.push(langPromise);
        }

        const languages = await Promise.all(langPromises);
        const langs = languages.map((l) => (isRight(l) ? l.right : []));
        const res = filteredRepos.map((repo, i) => ({
            ...repo,
            // FIXME: fix type inference
            languages: langs[i],
        }));
        return adaptToRepoStructure(res);
    }

    return [];
}

function parseDuration(duration: string): number {
    let num = "";
    let time = "";
    duration.split("").forEach((char) => {
        if (!Number.isNaN(Number(char))) {
            num += char;
        } else {
            time = char;
        }
    });

    if (time === "h") {
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + Number(num));
        return endTime.getTime();
    } else if (time === "w") {
        const endTime = new Date();
        endTime.setDate(endTime.getDate() + Number(num) * 7);
        return endTime.getTime();
    }
    return 0;
}

export async function getProjectsData(): Promise<
    Array<PROJECTS.RepoStructure> | undefined
> {
    let canFetch = true;
    try {
        if (fs.existsSync(cacheDest)) {
            const file = fs.readFileSync(cacheDest, "utf-8");
            const cachedProjects = JSON.parse(file);
            const cacheEndDate = Number(cachedProjects.endDate);
            if (cacheEndDate < Date.now()) {
                canFetch = true;
            } else {
                console.log('cached projects!!!');
                return cachedProjects.projects;
            }
        } else if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir);
        }
        if (canFetch) {
            const githubProjects = await fetchGithubProjects();
            const cachedProject = {
                projects: githubProjects,
                endDate: parseDuration("1w"),
            };

            fs.writeFileSync(cacheDest, JSON.stringify(cachedProject));
            return githubProjects;
        }
    } catch (e) {
        console.error("Cannot get projects: ", e);
    }
}
