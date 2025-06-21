"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const visibilityOptions = [
  { value: "public", label: "Public", icon: "🌍" },
  { value: "private", label: "Private", icon: "🔒" },
  { value: "unlisted", label: "Unlisted", icon: "🔗" },
]

const categoryOptions = [
  { value: "vlog", label: "Vlog", icon: "📹" },
  { value: "music", label: "Music", icon: "🎵" },
  { value: "gaming", label: "Gaming", icon: "🎮" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "other", label: "Other", icon: "📂" },
]

const CreateReels = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [category, setCategory] = useState("other")
  const [scheduleDate, setScheduleDate] = useState("")
  const [videoFile, setVideoFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [facingMode, setFacingMode] = useState("user")
  const [cameraError, setCameraError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Timer for recording
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startCamera = async () => {
  try {
    setCameraError("");
    setIsProcessing(true);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    const constraints = {
      video: {
        facingMode: facingMode,
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 }
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = null;  // Clear previous
      videoRef.current.srcObject = stream;
      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current.play();
            resolve();
          } catch (err) {
            console.error("Autoplay/play failed:", err);
            setCameraError("Unable to start video preview: " + err.message);
          }
        };
      });
    }

    setIsCameraOpen(true);
    setIsProcessing(false);
    console.log("Camera started successfully");
  } catch (error) {
    console.error("Error accessing camera:", error);
    setIsProcessing(false);
    setCameraError(`Unable to access camera: ${error.message}`);
  }
};

  const stopCamera = () => {
    console.log("Stopping camera...")
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
        console.log("Stopped track:", track.kind)
      })
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsCameraOpen(false)
    setIsRecording(false)
    setRecordingTime(0)
    chunksRef.current = []
  }

  const startRecording = () => {
    if (!streamRef.current) {
      console.error("No stream available for recording")
      return
    }

    try {
      console.log("Starting recording...")
      chunksRef.current = []

      // Check supported MIME types
      const mimeTypes = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"]

      let selectedMimeType = ""
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType
          break
        }
      }

      console.log("Using MIME type:", selectedMimeType)

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: selectedMimeType,
        videoBitsPerSecond: 2500000, // 2.5 Mbps
      })

      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        console.log("Data available:", event.data.size)
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        console.log("Recording stopped, processing...")
        setIsProcessing(true)

        setTimeout(() => {
          if (chunksRef.current.length > 0) {
            const blob = new Blob(chunksRef.current, { type: selectedMimeType })
            console.log("Created blob:", blob.size, "bytes")

            const file = new File([blob], `recorded-video-${Date.now()}.webm`, {
              type: selectedMimeType,
            })

            setVideoFile(file)
            console.log("Video file created:", file.name, file.size)
          } else {
            console.error("No chunks recorded")
            setCameraError("Recording failed - no data captured")
          }

          setIsProcessing(false)
          stopCamera()
        }, 500)
      }

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event.error)
        setCameraError(`Recording error: ${event.error.message}`)
        setIsRecording(false)
      }

      mediaRecorder.start(1000) // Collect data every second
      setIsRecording(true)
      console.log("Recording started")
    } catch (error) {
      console.error("Error starting recording:", error)
      setCameraError(`Failed to start recording: ${error.message}`)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log("Stopping recording...")
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const switchCamera = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user"
    setFacingMode(newFacingMode)

    if (isCameraOpen) {
      stopCamera()
      // Wait a bit before starting with new camera
      setTimeout(() => {
        startCamera()
      }, 500)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideoFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleCreate = async () => {
    if (!videoFile) {
      alert("Please upload or record a video file.")
      return
    }

    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log({
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
      visibility,
      category,
      scheduleDate,
      videoFile,
    })

    setIsUploading(false)
    alert("Reel published successfully!")
    resetForm()
  }

  const handleSaveDraft = () => {
    console.log("Draft saved:", {
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
      visibility,
      category,
      scheduleDate,
      videoFile,
    })
    alert("Draft saved!")
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setTags("")
    setVisibility("public")
    setCategory("other")
    setScheduleDate("")
    setVideoFile(null)
    stopCamera()
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-none">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full  bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#155d27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-[#208b3a] to-[#2dc653] bg-clip-text text-transparent">
               Explorea Creator Studio
              </h1>
            </div>
          </div>

          {/* Camera Button */}
          <button
            onClick={isCameraOpen ? stopCamera : startCamera}
            disabled={isProcessing}
            className={`flex items-center gap-2 px-4 py-2 rounded-[50px] font-medium transition-all ${
              isCameraOpen ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-[#208b3a] text-[#ffffff] hover:bg-[#25a244]"
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {isCameraOpen ? "Close Camera" : "Open Camera"}
              </>
            )}
          </button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera/Upload Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#1a7431]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {isCameraOpen ? "Record Video" : "Upload or Record Video"}
                </h2>
              </div>
              <div className="p-6">
                {isCameraOpen ? (
                  /* Camera Interface */
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-xl overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full aspect-video object-cover"
                        style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
                      />

                      {/* Recording Indicator */}
                      {isRecording && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
                        </div>
                      )}

                      {/* Processing Indicator */}
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                            <span className="text-gray-700 font-medium">Processing video...</span>
                          </div>
                        </div>
                      )}

                      {/* Camera Controls */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                        {/* Switch Camera */}
                        <button
                          onClick={switchCamera}
                          disabled={isRecording || isProcessing}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50"
                        >
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                        </button>

                        {/* Record Button */}
                        <button
                          onClick={isRecording ? stopRecording : startRecording}
                          disabled={isProcessing}
                          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            isRecording ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-white hover:bg-gray-100"
                          } disabled:opacity-50`}
                        >
                          {isRecording ? (
                            <div className="w-6 h-6 bg-white rounded-sm"></div>
                          ) : (
                            <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                          )}
                        </button>

                        {/* Close Camera */}
                        <button
                          onClick={stopCamera}
                          disabled={isRecording || isProcessing}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50"
                        >
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {cameraError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-700 text-sm font-medium">{cameraError}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Upload Interface */
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer group ${
                      dragActive
                        ? "border-[#25a244] bg-[#208b3a] scale-[1.02]"
                        : videoFile
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-[#2dc653] hover:bg-gray-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      {videoFile ? (
                        <>
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg
                              className="h-8 w-8 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="font-semibold text-green-700 mb-1 truncate max-w-xs">{videoFile.name}</p>
                          <p className="text-sm text-green-600">{formatFileSize(videoFile.size)}</p>
                          <button
                            className="mt-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              setVideoFile(null)
                            }}
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg
                              className="h-8 w-8 text-[#208b3a]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">Drop your video here</h3>
                          <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                          <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {["MP4", "MOV", "AVI", "MKV", "WEBM"].map((format) => (
                              <span
                                key={format}
                                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                              >
                                {format}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>or</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                startCamera()
                              }}
                              className="text-[#208b3a] hover:text-[#2dc653] font-medium underline"
                            >
                              record with camera
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Details Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#1a7431]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Video Details
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Give your reel a catchy title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:border-transparent transition-all"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell viewers about your reel..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Tags
                    </label>
                    <input
                      id="tags"
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="travel, adventure, fun"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-gray-500">Separate tags with commas</p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="visibility"
                      className="block text-sm font-medium text-gray-700 flex items-center gap-1"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Visibility
                    </label>
                    <select
                      id="visibility"
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:border-transparent transition-all"
                    >
                      {visibilityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Schedule (Optional)
                  </label>
                  <input
                    id="schedule"
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCreate}
                disabled={!videoFile || isUploading}
                className="flex-1 bg-gradient-to-r from-[#208b3a] to-[#25a244] hover:from-[#25a244] hover:to-[#208b3a] disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                    </svg>
                    Publish Reel
                  </>
                )}
              </button>
              <button
                onClick={handleSaveDraft}
                className="flex-1 sm:flex-none border-2 border-green-200 text-[#208b3a] hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
              >
                Save Draft
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 h-[85vh] bottom-24">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Preview
                </h2>
              </div>
              <div className="p-6">
                <div className="aspect-[9/16] max-w-[280px] mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800">
                  {videoFile ? (
                    <video
                      key={videoFile.name} // Force re-render when file changes
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                      <svg className="h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm font-medium mb-2">No video selected</p>
                      <p className="text-xs opacity-75">Upload or record a video to see preview</p>
                    </div>
                  )}
                </div>

                {videoFile && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Video Info</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>
                        <span className="font-medium">Size:</span> {formatFileSize(videoFile.size)}
                      </p>
                      <p>
                        <span className="font-medium">Type:</span> {videoFile.type}
                      </p>
                      <p>
                        <span className="font-medium">Name:</span> {videoFile.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateReels
