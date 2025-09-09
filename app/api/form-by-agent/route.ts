import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent_id } = body;

    if (!agent_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Agent ID is required",
        },
        { status: 400 }
      );
    }

    // Query form by agent_id
    const { data: form, error } = await supabase
      .from("forms")
      .select("*")
      .eq("agent_id", agent_id)
      .single();

    if (error) {
      console.error("Error fetching form by agent_id:", error);
      
      // Check if no form was found
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: "No form found with the provided agent ID",
            form: null
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch form",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      form: form,
      message: "Form retrieved successfully"
    });
  } catch (error) {
    console.error("Error in form-by-agent API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agent_id = searchParams.get('agent_id');

    if (!agent_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Agent ID is required as query parameter",
        },
        { status: 400 }
      );
    }

    // Query form by agent_id
    const { data: form, error } = await supabase
      .from("forms")
      .select("*")
      .eq("agent_id", agent_id)
      .single();

    if (error) {
      console.error("Error fetching form by agent_id:", error);
      
      // Check if no form was found
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: "No form found with the provided agent ID",
            form: null
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch form",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      form: form,
      message: "Form retrieved successfully"
    });
  } catch (error) {
    console.error("Error in form-by-agent API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}