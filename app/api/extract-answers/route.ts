import { NextRequest, NextResponse } from "next/server";
import {
  generateQuestionAnswerPairs,
  type QuestionAnswerPairs,
} from "../openai";
import { supabase } from "@/lib/supabase";

interface ExtractAnswersRequest {
  questions: string[];
  conversationTranscript: string;
}

interface ExtractAnswersResponse {
  success: boolean;
  data?: QuestionAnswerPairs;
  error?: string;
  message?: string;
}

const POST_CALL_AUDIO = "post_call_audio";
const POST_CALL_TRANSCRIPTION = "post_call_transcription";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ExtractAnswersResponse>> {
  try {
    const body: ExtractAnswersRequest = await request.json();
    // wsec_4d1b7d752040a6704abbf41c1df0769f460669243cb93b142b6f7ae28af41202
    // console.log("EXTRACT ENDPOINT HIT", body);

    // if (
    //   body.type !== POST_CALL_AUDIO ||
    //   body.type !== POST_CALL_TRANSCRIPTION
    // ) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: `Non-supported webhook request type: ${body.type}`,
    //     },
    //     { status: 400 }
    //   );
    // }
// wsec_5e8ad49e6781029a29cf2a89aa06f2f7fddcf9332d9a63e0939b917eb364df4c

    const { data: form, error } = await supabase
      .from("forms")
      .select("*")
      .eq("agent_id", body?.data?.agent_id)
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: `err type: ${JSON.stringify(error)}`,
        },
        { status: 500 }
      );
    }

    const questionAnswerPairs = await generateQuestionAnswerPairs(
      form.questions,
      body?.data?.transcript
    );

    const { error: saveSubmissionError } = await supabase
      .from("submissions")
      .insert({
        agent_id: body?.data?.agent_id,
        form_id: form?.id,
        duration: body?.data?.total_duration,
        summary: body?.data?.transcript_summary,

        answers: JSON.stringify(questionAnswerPairs),
        transcript: JSON.stringify(body?.data?.transcript),
      })

    if (saveSubmissionError) {
      console.error("err saving:");
      console.error(saveSubmissionError);
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
      message: "Answers extracted successfully",
    });
  } catch (error) {
    console.error("Error extracting answers:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to extract answers",
      },
      { status: 500 }
    );
  }
}
