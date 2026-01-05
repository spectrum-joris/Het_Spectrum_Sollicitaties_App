// Re-export blob storage functions for backward compatibility
export {
  uploadFile,
  deleteFile,
  fileExists,
  getFileUrl as getPublicFileUrl,
  getStorageType
} from './blob-storage.js';
