// hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { LoginRequest, Vendor } from "../types"
import { loginUser } from "../api/auth"

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),

    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)

      queryClient.setQueryData<Vendor>(["vendor"], data.vendor)

      navigate("/")
    },
  })
}
