const apiSuccessResponse = (payload: any | null): object => {
  return {
    success: true,
    payload,
  }
}

export default apiSuccessResponse
