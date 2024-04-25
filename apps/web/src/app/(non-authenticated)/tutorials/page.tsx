'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Card, Button } from 'antd'
import { BookOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TutorialsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [tutorials, setTutorials] = useState([])

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const tutorialsFound = await Api.Tutorial.findMany({
          includes: ['tutorialcomponents', 'tutorialcomponents.component'],
        })
        setTutorials(tutorialsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch tutorials', { variant: 'error' })
      }
    }

    fetchTutorials()
  }, [])

  const handleTutorialClick = tutorialId => {
    router.push(`/tutorials/${tutorialId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <BookOutlined /> Web Development Tutorials
      </Title>
      <Text type="secondary">
        Browse through a variety of tutorials to enhance your coding skills.
      </Text>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={tutorials}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.title}
              extra={
                <Button
                  type="link"
                  onClick={() => handleTutorialClick(item.id)}
                >
                  View
                </Button>
              }
            >
              <Text>
                {item.content
                  ? item.content.substring(0, 100) + '...'
                  : 'No content available'}
              </Text>
              <div>
                <Text type="secondary">
                  Updated: {dayjs(item.dateUpdated).format('MMM D, YYYY')}
                </Text>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
