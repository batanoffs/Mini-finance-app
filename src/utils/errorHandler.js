export const errorHandler = (error) => {
    return {
        success: false,
        ok: false,
        message: error.message,
        error: error,
    }
}
