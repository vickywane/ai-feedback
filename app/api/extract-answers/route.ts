import { NextRequest, NextResponse } from 'next/server';
import { generateQuestionAnswerPairs, type QuestionAnswerPairs } from '../openai';

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

export async function POST(request: NextRequest): Promise<NextResponse<ExtractAnswersResponse>> {
  try {
    const body: ExtractAnswersRequest = await request.json();
    
    const { questions, conversationTranscript } = body;
    
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Questions array is required and must not be empty' 
        },
        { status: 400 }
      );
    }
    
    if (!conversationTranscript || typeof conversationTranscript !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Conversation transcript is required and must be a string' 
        },
        { status: 400 }
      );
    }
    
    const questionAnswerPairs = await generateQuestionAnswerPairs(
      questions,
      conversationTranscript
    );
    
    return NextResponse.json({
      success: true,
      data: questionAnswerPairs,
      message: 'Answers extracted successfully'
    });
  } catch (error) {
    console.error('Error extracting answers:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to extract answers' 
      },
      { status: 500 }
    );
  }
}