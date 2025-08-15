"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Video, Calendar, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VideoManagementPage() {
  const [videoName, setVideoName] = useState("")
  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [currentHashtag, setCurrentHashtag] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [scheduleType, setScheduleType] = useState("now")

  const addHashtag = () => {
    if (currentHashtag.trim() && !hashtags.includes(currentHashtag.trim())) {
      setHashtags([...hashtags, currentHashtag.trim()])
      setCurrentHashtag("")
    }
  }

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove))
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Here you would implement the actual video upload logic
    console.log("[v0] Video publishing data:", {
      videoName,
      caption,
      hashtags,
      videoFile,
      scheduleType,
    })

    setIsUploading(false)
    setUploadProgress(0)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Video className="h-8 w-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">Video Management</h1>
          <p className="text-gray-400">Publish and manage horror videos for your platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Video Publishing Form */}
        <div className="xl:col-span-3">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Publish New Video
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload and configure your horror video content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Video Upload */}
                <div className="space-y-2">
                  <Label htmlFor="video-upload" className="text-white">
                    Video File
                  </Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-red-500 transition-colors relative">
                    {videoFile ? (
                      <div className="space-y-2">
                        <Video className="h-12 w-12 text-red-500 mx-auto" />
                        <p className="text-white font-medium">{videoFile.name}</p>
                        <p className="text-gray-400 text-sm">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setVideoFile(null)
                            if (videoUrl) {
                              URL.revokeObjectURL(videoUrl)
                              setVideoUrl(null)
                            }
                          }}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Upload className="h-12 w-12 text-gray-500 mx-auto" />
                          <p className="text-white">Drop your video here or click to browse</p>
                          <p className="text-gray-400 text-sm">MP4, MOV, AVI up to 500MB</p>
                        </div>
                        <Label htmlFor="video-upload" className="absolute inset-0 cursor-pointer" />
                      </>
                    )}
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Video Name */}
                <div className="space-y-2">
                  <Label htmlFor="video-name" className="text-white">
                    Video Name
                  </Label>
                  <Input
                    id="video-name"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                    placeholder="Enter a spine-chilling video title..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                    required
                  />
                </div>

                {/* Caption */}
                <div className="space-y-2">
                  <Label htmlFor="caption" className="text-white">
                    Caption
                  </Label>
                  <Textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a haunting description for your video..."
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 resize-none"
                    required
                  />
                </div>

                {/* Hashtags */}
                <div className="space-y-2">
                  <Label className="text-white">Hashtags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentHashtag}
                      onChange={(e) => setCurrentHashtag(e.target.value)}
                      placeholder="Add horror hashtags..."
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHashtag())}
                    />
                    <Button
                      type="button"
                      onClick={addHashtag}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-red-900 text-red-100 hover:bg-red-800">
                          #{tag}
                          <button type="button" onClick={() => removeHashtag(tag)} className="ml-2 hover:text-red-300">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <Label className="text-white">Publishing Schedule</Label>
                  <Select value={scheduleType} onValueChange={setScheduleType}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="now" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Publish Now
                        </div>
                      </SelectItem>
                      <SelectItem value="schedule" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Schedule for Later
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">Uploading...</span>
                      <span className="text-red-400">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!videoFile || !videoName || !caption || isUploading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-700 disabled:text-gray-400"
                >
                  {isUploading ? "Publishing..." : "Publish Video"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Video Preview & Stats */}
        <div className="xl:col-span-2 space-y-6">
          {/* Live Preview */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-red-400">Live Preview</CardTitle>
              <CardDescription className="text-gray-400">See how your video will appear to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg overflow-hidden border border-gray-700">
                {/* Mobile-style preview container */}
                <div className="aspect-[9/16] max-w-[280px] mx-auto bg-gray-800 relative">
                  {videoUrl ? (
                    <video src={videoUrl} className="w-full h-full object-contain" controls muted loop />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Video className="h-12 w-12 text-gray-600 mx-auto" />
                        <p className="text-gray-500 text-sm">Upload a video to preview</p>
                      </div>
                    </div>
                  )}

                  {/* Overlay content preview */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="space-y-2">
                      {videoName && <h3 className="text-white font-semibold text-sm line-clamp-2">{videoName}</h3>}
                      {caption && <p className="text-gray-200 text-xs line-clamp-3">{caption}</p>}
                      {hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {hashtags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-red-400 text-xs">
                              #{tag}
                            </span>
                          ))}
                          {hashtags.length > 3 && (
                            <span className="text-gray-400 text-xs">+{hashtags.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons preview */}
                  <div className="absolute right-2 bottom-20 space-y-4">
                    <div className="bg-gray-800/80 rounded-full p-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">♥</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/80 rounded-full p-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">💬</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/80 rounded-full p-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-red-400">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Videos</span>
                <span className="text-white font-semibold">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Published Today</span>
                <span className="text-white font-semibold">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Scheduled</span>
                <span className="text-white font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Views</span>
                <span className="text-white font-semibold">45.2K</span>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Tips */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-red-400">Publishing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-400">
              <p>• Use compelling horror-themed titles</p>
              <p>• Add relevant hashtags for better discovery</p>
              <p>• Keep captions engaging but concise</p>
              <p>• Schedule posts for peak horror hours (8-11 PM)</p>
              <p>• Ensure video quality is HD or higher</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
