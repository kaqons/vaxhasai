'use client'

import { Upload, Button, Typography, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function FileUploadPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options
    try {
      const url = await Api.Upload.upload(file)
      await Api.File.createOneByProjectId(params.id, {
        fileName: file.name,
        fileType: file.type,
        filePathUrl: url,
        projectId: params.id,
      })
      onSuccess('File uploaded successfully')
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      onError('Error uploading file')
      enqueueSnackbar('Error uploading file', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Upload File</Title>
      <Text>
        Upload files to your project. Only one file can be uploaded at a time.
      </Text>
      <Upload.Dragger
        name="file"
        multiple={false}
        customRequest={handleUpload}
        showUploadList={false}
        beforeUpload={() => false} // Prevent auto uploading
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: '#1890ff' }} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibit from uploading company
          data or other band files
        </p>
      </Upload.Dragger>
      <Button
        type="primary"
        onClick={() => router.push(`/project/${params.id}`)}
      >
        Back to Project
      </Button>
    </PageLayout>
  )
}
