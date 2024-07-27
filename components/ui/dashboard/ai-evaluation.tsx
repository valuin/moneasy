'use client';
import { useState, useEffect } from 'react';
import { getAnswer } from '@/lib/actions/getAI';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Sparkles } from 'lucide-react';
import { marked } from 'marked';
import { fetchDataForSystemPrompt } from '@/lib/actions/getAI';

export default function AIEvaluation() {
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    async function fetchAnswer() {
      try {
        const data = await fetchDataForSystemPrompt();
        const dataPrompt = JSON.stringify(data, null, 2);
        const { text } = await getAnswer(`please make my financial evaluation for 3 months based on my data: ${dataPrompt}`);
        const markedText = await marked(text); // Await the result of marked
        setAnswer(markedText);
      } catch (error) {
        console.error('Failed to fetch the answer:', error);
      }
    }
    fetchAnswer();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-2xl font-bold">
            <Sparkles className="text-zinc-500" />
            AI Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base text-zinc-600" dangerouslySetInnerHTML={{ __html: answer }} />
        </CardContent>
      </Card>
    </div>
  );
}
