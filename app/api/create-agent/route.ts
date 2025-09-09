import { NextRequest, NextResponse } from "next/server";
import { createAgent } from "../eleven_labs";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formName, goal, context, questions, user_id } = body;

    const PROMPT = `
    I am an event organizer trying to get feedback on the event you attended. 

    Objectives: 
    (1) Enhance User Experience by transforming rigid questions into interactive, multi-turn conversations (voice + text), allowing users to speak naturally and converting voice into structured data fields with sentiment analysis. 
    (2) Provide Data Insights & Analytics by automatically structuring responses into datasets, offering real-time analytics on sentiment, clarity, and drop-off points, and supporting future conversational branching. 
    (3) Integrate ElevenLabs voice synthesis with adaptive tones to create natural, empathetic, and engaging conversational flows. 
    Deliverables: output a clear product blueprint (user journey), a technical design outline (architecture, APIs, integrations), a sample demo script (illustrating a user providing information via conversation), and describe the role of ElevenLabs voice in making the experience compelling. 
    Constraints: Must be scalable for enterprise data collection, prioritize usability, accessibility, and trust, and anticipate future enhancements such as multilingual support, adaptive questioning, and predictive autofill."

    User form questions: ${questions}
    Goal: ${goal}
    `;

    if (!formName || !goal || !context) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: name, goal, and context are required",
        },
        { status: 400 }
      );
    }

    const agentName = `form-ai-${formName}`;
    const agent = await createAgent(agentName, PROMPT, context);

    // Insert form data into Supabase
    const { data: formData, error: dbError } = await supabase
      .from("forms")
      .insert({
        name: agentName,
        goal,
        context,
        agent_id: agent?.agentId || null,
        created_by: user_id
      })
      .select()
      .single();

    if (dbError) {
      console.error("err saving:");
      console.error(dbError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save form data to database",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      agent,
      formData,
      message: "Agent created and form saved successfully",
    });
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create agent",
      },
      { status: 500 }
    );
  }
}
