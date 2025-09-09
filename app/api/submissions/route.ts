import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { data: submissions, error } = await supabase
      .from("submissions")
      .select(`
        *,
        forms (
          name,
          goal
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch submissions",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submissions: submissions,
      message: "Submissions retrieved successfully"
    });
  } catch (error) {
    console.error("Error in submissions API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}