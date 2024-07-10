import { generateReactHelpers } from '@uploadthing/react/hooks'

import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { ClientUploadedFileData } from 'uploadthing/types';

export const { useUploadThing,uploadFiles } = generateReactHelpers<OurFileRouter>()
export type { ClientUploadedFileData };