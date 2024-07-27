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
        const { text } = await getAnswer(`Make a simple yet concise financial evaluation of health and optimality for 3 months based on my financial business data, keep in mind that the currency is in IDR, and the data is given in this format: ${dataPrompt}`);
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
