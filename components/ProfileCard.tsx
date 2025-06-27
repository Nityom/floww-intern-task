"use client"

import type React from "react"
import { useState } from "react"
import { Edit2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: number
  name: string
  email: string
  avatar: string
}

interface ProfileCardProps {
  user: User
  onUpdateUser: (user: User) => void
}

export default function ProfileCard({ user, onUpdateUser }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("url")

  const handleEditProfile = () => {
    setIsEditing(true)
    setEditForm({ name: user.name, email: user.email, avatar: user.avatar })
    setPreviewImage(null)
    setUploadMethod("url")
  }

  const handleSaveProfile = () => {
    onUpdateUser({ ...user, ...editForm })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({ name: user.name, email: user.email, avatar: user.avatar })
    setPreviewImage(null)
    setUploadMethod("url")
  }

  const handleImageUrlChange = (url: string) => {
    setEditForm({ ...editForm, avatar: url })
    setPreviewImage(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditForm({ ...editForm, avatar: result })
        setPreviewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetImagePreview = () => {
    setPreviewImage(null)
    setEditForm({ ...editForm, avatar: user.avatar })
  }

  return (
    <Card className="lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Profile Information</CardTitle>
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={handleEditProfile}>
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={previewImage || editForm.avatar || "/placeholder.svg"} alt={editForm.name} />
                  <AvatarFallback className="text-lg">
                    {editForm.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {previewImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-transparent"
                    onClick={resetImagePreview}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>

              {/* Profile Picture Section */}
              <div className="space-y-3">
                <Label>Profile Picture</Label>
                <div className="flex space-x-2 mb-3">
                  <Button
                    type="button"
                    variant={uploadMethod === "url" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadMethod("url")}
                    className="flex-1"
                  >
                    Image URL
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMethod === "upload" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadMethod("upload")}
                    className="flex-1"
                  >
                    Upload File
                  </Button>
                </div>

                {uploadMethod === "url" ? (
                  <div>
                    <Input
                      key="url-input"
                      placeholder="Enter image URL"
                      value={editForm.avatar?.startsWith("data:") ? "" : editForm.avatar || ""}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a direct link to an image (jpg, png, gif, etc.)
                    </p>
                  </div>
                ) : (
                  <div>
                    <Input
                      key="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload an image file (max 5&nbsp;MB)</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button onClick={handleSaveProfile} size="sm" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancelEdit} variant="outline" size="sm" className="flex-1 bg-transparent">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
