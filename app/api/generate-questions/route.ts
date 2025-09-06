import { NextRequest, NextResponse } from 'next/server';
import { generateFormQuestions } from '../openai';

interface GenerateQuestionsRequest {
  formName: string;
  goal: string;
  context: string;
  numQuestions?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateQuestionsRequest = await request.json();
    
    const { formName, goal, context, numQuestions = 3 } = body;
    
    // Validate required fields
    if (!formName || !goal || !context) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: formName, goal, and context are required' 
        },
        { status: 400 }
      );
    }

    const result = await generateFormQuestions(
      formName,
      goal,
      context,
      numQuestions
    );
    
    return NextResponse.json({
      success: true,
      questions: result.questions,
      message: 'Questions generated successfully'
    });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate questions' 
      },
      { status: 500 }
    );
  }
}