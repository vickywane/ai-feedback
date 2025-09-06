import { NextRequest, NextResponse } from 'next/server';
import { createAgent } from '../eleven_labs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, prompt, context } = body;

    if (!name || !prompt || !context) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, prompt, and context are required' 
        },
        { status: 400 }
      );
    }

    const agent = await createAgent(name, prompt, context);

    return NextResponse.json({
      success: true,
      agent,
      message: 'Agent created successfully'
    });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create agent' 
      },
      { status: 500 }
    );
  }
}