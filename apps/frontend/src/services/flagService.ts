import http from "./httpService";

const apiEndpoint = "/flags";

export const getFlagsForProject = async (projectId: string) => {
    const { data: result } = await http.get(
        `${apiEndpoint}/project/${projectId}`
    );
    return result;
};

export const addFlag = async (flag: any) => {
    const result = await http.post(`${apiEndpoint}`, flag);
    return result;
};

export const deleteFlag = async (flagId: string) => {
    const result = await http.delete(`${apiEndpoint}/${flagId}`);
    return result;
}


