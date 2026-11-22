"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { addMenu } from "@/lib/actions/menu"

import { AuthFormField } from "@/components/auth-forms/auth-form-field"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MENU_CATEGORIES } from "@/lib/menu-items"
import type { MenuCategory, NewMenuItem } from "@/lib/menu-items"
import { uploadImage } from "@/lib/upload-img"
import { getMenuItemError } from "@/lib/menu-validator"
import { authClient } from "@/lib/auth-client"

export function AddMenuItemForm() {
  const [category, setCategory] = useState<MenuCategory>(MENU_CATEGORIES[0])
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = authClient.useSession()
  const userId = session?.user?.id
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget // save it, we need it after the awaits below

    // Read the values typed into the form
    const formData = new FormData(form)

    // We need a signed-in user so the item can be linked to the right vendor.
    if (!userId) {
      toast.error("Please sign in as a vendor to add a menu item.")
      return
    }

    const itemName = formData.get("itemName") as string
    const description = formData.get("description") as string
    const price = Number(formData.get("price"))
    const location = formData.get("location") as string
    // Only a real file counts. An empty file input returns null here.
    const imageFile = formData.get("image")
    const file = imageFile instanceof File ? imageFile : null

    // Stop early if something is missing or invalid
    const validationError = getMenuItemError({
      itemName,
      description,
      price,
      location,
      imageFile: file,
    })
    if (validationError) {
      toast.error(validationError)
      return
    }
    // Helping TypeScript see what the validator already checked.
    if (!file) return

    setIsLoading(true)
    try {
      // 1. Upload the picture and get its public URL
      const imageUrl = await uploadImage(file)

      // 2. Build the data we will send to the server
      const newItem: NewMenuItem = {
        vendorId: userId,
        vendorName: session!.user.name,
        vendorBusinessName: session!.user.businessName ?? null,
        itemName: itemName.trim(),
        category,
        description: description.trim(),
        price,
        location: location.trim(),
        images: [imageUrl],
      }

      const result = await addMenu(newItem)
      toast.success(result.message || "Menu item submitted for approval.")

      form.reset()
      setCategory(MENU_CATEGORIES[0])
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <AuthFormField
          id="itemName"
          name="itemName"
          label="Item Name"
          placeholder="Margherita Classic"
          required
        />

        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as MenuCategory)}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MENU_CATEGORIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Tomato sauce, fresh mozzarella, and basil on a thin crust."
            rows={4}
            required
          />
        </Field>

        <AuthFormField
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          label="Price"
          placeholder="12.99"
          required
        />

        <AuthFormField
          id="location"
          name="location"
          label="Location (area / city)"
          placeholder="Zindabazar, Sylhet"
          required
        />

        <AuthFormField
          id="image"
          name="image"
          type="file"
          accept="image/*"
          label="Item Image"
          description="Required. JPG or PNG, up to 4 MB."
          required
        />

        <Field>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Uploading..." : "Add Menu Item"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
