'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Spin } from 'antd'
import { BookOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
interface Educationalresource {
  id: string
  title?: string
  content?: string
  dateCreated: string
  dateUpdated: string
  dateDeleted: string
}
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EducationalResourcesPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState<Educationalresource[]>([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resources = await Api.Educationalresource.findMany()
        setResources(resources)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch resources', { variant: 'error' })
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <BookOutlined /> Educational Resources
      </Title>
      <Text type="secondary">
        Enhance your web development skills with our curated tutorials and
        resources.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          resources?.map(resource => (
            <Col key={resource.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={resource.title}
                bordered={false}
                hoverable
                onClick={() =>
                  enqueueSnackbar('Resource clicked', { variant: 'info' })
                }
              >
                <Text>{resource.content}</Text>
                <Text
                  type="secondary"
                  style={{ display: 'block', marginTop: 12 }}
                >
                  Updated: {dayjs(resource.dateUpdated).format('MMMM D, YYYY')}
                </Text>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </PageLayout>
  )
}
