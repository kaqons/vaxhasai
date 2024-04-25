'use client'

import { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateProjectPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: {
    name: string
    description: string
  }) => {
    if (!userId) {
      enqueueSnackbar('User must be logged in to create a project', {
        variant: 'error',
      })
      return
    }

    try {
      const project = await Api.Project.createOneByUserId(userId, {
        name: values.name,
        description: values.description,
        userId: userId,
      })
      enqueueSnackbar('Project created successfully!', { variant: 'success' })
      router.push(`/project/${project.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to create project', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Create a New Project</Title>
      <Paragraph>
        Enter the details of your new project below. Make sure to provide both a
        name and a description.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            { required: true, message: 'Please input the project name!' },
          ]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Project Description"
          rules={[
            {
              required: true,
              message: 'Please input the project description!',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter project description" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Create Project
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
