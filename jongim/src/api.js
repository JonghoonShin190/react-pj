const BASE_URL = "http://localhost:8090/api";

export async function getNews({ order = "date", offset = 0, limit = 6 }) {
    //throw new Error("버그가 아니라 기능입니다......")
    const query = `order=${order}&offset=${offset}&limit=${limit}`;

    const response = await fetch(`${BASE_URL}/news?${query}`);
    if (!response.ok) {
        throw new Error("뉴스를 불러오는데 실패했습니다......");
    }

    const body = await response.json();
    return body;
}

export async function createNews(formData) {
    const response = await fetch(`${BASE_URL}/news`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("뉴스를 생성하는데 실패했습니다......");
    }

    const body = await response.json();
    return body;

}

export async function updateNews(aid, formData) {
    const response = await fetch(`${BASE_URL}/news/${aid}`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("뉴스를 수정하는데 실패했습니다......");
    }

    const body = await response.json();
    return body;

}

export async function deleteNews(aid, formData) {
    const response = await fetch(`${BASE_URL}/news/del/${aid}`, {
        method: "POST",
        body: formData,

    });
    if (!response.ok) {
        throw new Error("뉴스를 삭제하는데 실패했습니다......");
    }
    const body = await response.json();
    return body;
}