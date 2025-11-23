// src/app/api/upload-to-ipfs/route.ts
import { NextRequest, NextResponse } from "next/server";

const PINATA_API_KEY = "a6de98e99ea3a18c8bb2"; 
const PINATA_SECRET_KEY = "a51d087a00ea0568de12daf245a3dc65ec9b2d6095746635e2bc63cb64aa95c3"; 
const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MjAxYTNmNi1jNWZmLTRiNjQtYjMzOC02OGQxM2NlY2U1OGEiLCJlbWFpbCI6InRoYW5ndHJhbjg4MjExMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTZkZTk4ZTk5ZWEzYTE4YzhiYjIiLCJzY29wZWRLZXlTZWNyZXQiOiJhNTFkMDg3YTAwZWEwNTY4ZGUxMmRhZjI0NWEzZGM2NWVjOWIyZDYwOTU3NDY2MzVlMmJjNjNjYjY0YWE5NWMzIiwiZXhwIjoxNzk1MzM0NzM3fQ.paKtNrMsOjzaz_TxYQ2Od3ClxyNR3xjZjpN6O0cz0Ko"; 
const PINATA_GATEWAY = "https://olive-deliberate-octopus-539.mypinata.cloud";

export async function POST(req: NextRequest) {
  try {
    debugger
    const form = await req.formData();
    const file = form.get("file");

    // Kiểm tra file đúng kiểu File/Blob
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No valid file provided" }, { status: 400 });
    }

    const data = new FormData();
    data.append("file", file, (file as File).name || "file.png");

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: data,
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("Pinata response error:", json);
      return NextResponse.json({ error: json.error || "Upload failed" }, { status: 500 });
    }

    const url = `ipfs://${json.IpfsHash}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Pinata upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
