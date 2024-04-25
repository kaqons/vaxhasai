'use client'

import { useEffect, useState } from 'react'
import { Input, Button, Typography } from 'antd'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function App() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [feedback, setFeedback] = useState('')
  const [response, setResponse] = useState<string | null>(null)

  useEffect(() => {
    router.push('/home')
  }, [router])

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value)
  }

  const submitFeedback = async () => {
    try {
      const modifiedCode = await Api.Ai.chat(feedback)
      setResponse(modifiedCode)
      enqueueSnackbar('Feedback submitted successfully!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to submit feedback.', { variant: 'error' })
    }
  }

  return (
    <div className="index-page">
      <Title level={2}>Super IQ Ultra Advanced</Title>
      <Text>Albert Einstein Super IQ Ultra Advanced</Text>
      <div style={{ marginTop: '20px' }}>
        <Input
          placeholder="Enter your feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          style={{ marginBottom: '10px' }}
        />
        <Button type="primary" onClick={submitFeedback}>
          Submit Feedback
        </Button>
      </div>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <Title level={4}>AI Response:</Title>
          <Text>{response}</Text>
        </div>
      )}
    </div>
  )
}