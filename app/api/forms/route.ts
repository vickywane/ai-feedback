import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 }
      );
    }

    // Fetch forms for the specific user
    const { data: forms, error } = await supabase
      .from("forms")
      .select("*")
      .eq("created_by", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching forms:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch forms",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      forms: forms || [],
    });
  } catch (error) {
    console.error("Error in forms API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}