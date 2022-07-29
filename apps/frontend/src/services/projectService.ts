import http from "./httpService";

const apiEndpoint = "/projects";

export async function getAllProjectsForUser(userId: string) {
    const result = await http.get(`${apiEndpoint}/user/${userId}`);

    return result;
}

export async function addProject(project: any) {
    const result = await http.post(`${apiEndpoint}`, project);
    return result;
}

export async function getProjectById(projectId: string) {
    const { data } = await http.get(`${apiEndpoint}/${projectId}`);
    return data;
}

export async function deleteProject(projectId: string) {
    const result = await http.delete(`${apiEndpoint}/${projectId}`);
    return result;
}
