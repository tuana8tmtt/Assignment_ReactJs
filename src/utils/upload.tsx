import axios from "axios";

export const uploadImage = async (imgPost: any) => {
    const CLOUDINARY_PRESET = "j4owmmdw";
    const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dbo0o124i/image/upload";
    let imgLink = "";
    const file = imgPost?.files[0];

    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_PRESET);
        const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
            headers: {
                "Content-Type": "application/form-data",
            },
        });
        imgLink = data.url
    }
    return imgLink
}
export const Money = (currency: number) => currency?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
