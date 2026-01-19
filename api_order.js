import fetch from "node-fetch";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ success: false, message: "Method not allowed" });
        return;
    }

    const { email, jumlah } = req.body;
    if (!email || !jumlah) {
        res.status(400).json({ success: false, message: "Email dan jumlah wajib diisi" });
        return;
    }

    try {
        const apiURL = "https://pa.mangzaxhost.com/order/Mangzax";
        const params = new URLSearchParams();
        params.append("email", email);
        params.append("jumlah", jumlah);

        const response = await fetch(apiURL, {
            method: "POST",
            body: params
        });

        const data = await response.json();
        res.status(200).json({ success: true, apiResponse: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
                             }
