import { connectDB } from "@/dbConnection/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
  // extract data from token
  const userID = await getDataFromToken(request);
  const user = await User.findOne({ _id: userID }).select("-password");

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  return NextResponse.json({
    message: "User found",
    data: user
  })
}
