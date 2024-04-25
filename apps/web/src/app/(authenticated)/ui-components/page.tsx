'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Space } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UIComponentsLibraryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [uicomponents, setUicomponents] = useState([])

  useEffect(() => {
    const fetchUicomponents = async () => {
      try {
        const components = await Api.Uicomponent.findMany({
          includes: [
            'tutorialcomponentsAsComponent',
            'projectcomponentsAsComponent',
          ],
        })
        setUicomponents(components)
      } catch (error) {
        enqueueSnackbar('Failed to fetch UI components', { variant: 'error' })
      }
    }

    fetchUicomponents()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>UI Components Library</Title>
        <Text>
          This library showcases various UI components that users can utilize in
          their projects.
        </Text>
        <Row gutter={[16, 16]}>
          {uicomponents?.map(component => (
            <Col key={component.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={component.name}
                bordered={false}
                actions={[
                  <CodeOutlined
                    key="code"
                    onClick={() =>
                      router.push(`/ui-components/${component.id}`)
                    }
                  />,
                ]}
              >
                <Text>{component.codeSnippet}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
