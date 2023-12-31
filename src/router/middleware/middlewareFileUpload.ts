import * as path from 'path';
import * as multer from 'multer';

export const logUploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'boards/logs/sample-console-logs/logs/training')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
})

export const metricUploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'boards/logs/sample-console-logs/metrics/training')
        },
        filename: (req, file, cb) => {
            cb(null, path.extname(file.originalname))
        }
    })
})

export const simtraceUploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'boards/logs/sample-console-logs/sim-trace/training')
        },
        filename: (req, file, cb) => {
            cb(null, path.extname(file.originalname))
        }
    })
})