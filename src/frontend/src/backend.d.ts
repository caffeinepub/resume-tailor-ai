import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Resume {
    name: string;
    education: Array<string>;
    workExperience: Array<string>;
    languages: Array<string>;
    summary: string;
    certificates: Array<string>;
    position: string;
    skills: Array<string>;
}
export interface backendInterface {
    createResume(resume: Resume): Promise<void>;
    tailorResume(baseResume: Resume, jobDescription: string): Promise<Resume>;
}
