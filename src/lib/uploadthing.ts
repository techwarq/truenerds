import { generateReactHelpers } from '@uploadthing/react/hooks'
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";

import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { ClientUploadedFileData } from 'uploadthing/types';

export const { useUploadThing,uploadFiles } = generateReactHelpers<OurFileRouter>()
export type { ClientUploadedFileData };
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();