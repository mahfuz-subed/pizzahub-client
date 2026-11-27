"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Eye, EyeOff, Loader2, Pencil, Trash2 } from "lucide-react"

import { AuthFormField } from "@/components/auth-forms/auth-form-field"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { deleteMenu, updateMenu } from "@/lib/actions/menu"
import {
  MENU_CATEGORIES,
  type MenuCategory,
  type MenuItem,
} from "@/lib/menu-items"
import { getMenuItemError } from "@/lib/menu-validator"
import { uploadImage } from "@/lib/upload-img"

type VendorMenuActionsProps = {
  item: MenuItem
  vendorId: string
}

export function VendorMenuActions({ item, vendorId }: VendorMenuActionsProps) {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [category, setCategory] = useState<MenuCategory>(item.category)

  // "approved" means visible to customers, "inactive" means hidden.
  const isAvailable = item.status === "approved"
  const canToggleAvailability =
    item.status === "approved" || item.status === "inactive"

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const itemName = formData.get("itemName") as string
    const description = formData.get("description") as string
    const price = Number(formData.get("price"))
    const location = formData.get("location") as string
    // getAll() returns every selected file. An untouched input gives nothing
    // useful, so we filter those out.
    const imageFiles = formData
      .getAll("images")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0)

    const validationError = getMenuItemError({
      itemName,
      description,
      price,
      location,
      imageFile: imageFiles[0] ?? null,
      requireImage: false,
    })
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsSaving(true)
    try {
      // No new files -> keep the existing images.
      // New files -> upload each one and replace the list with their URLs.
      let images = item.images
      if (imageFiles.length > 0) {
        const urls: string[] = []
        for (const file of imageFiles) {
          urls.push(await uploadImage(file))
        }
        images = urls
      }

      await updateMenu(item._id, {
        vendorId,
        itemName: itemName.trim(),
        category,
        description: description.trim(),
        price,
        location: location.trim(),
        images,
      })

      toast.success("Menu item updated.")
      setIsEditOpen(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update the item."
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    setIsSaving(true)
    try {
      await deleteMenu(item._id)
      toast.success("Menu item deleted.")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete the item."
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function handleAvailability() {
    setIsSaving(true)
    try {
      await updateMenu(item._id, {
        vendorId,
        status: isAvailable ? "inactive" : "approved",
      })
      toast.success(
        isAvailable
          ? "Item hidden from customers."
          : "Item is now available to customers."
      )
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not change availability."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mt-auto flex flex-wrap gap-2 border-t px-4 py-4">
      {/* UPDATE — opens a dialog with the item fields */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger
          render={
            <Button variant="outline" size="sm" className="flex-1" />
          }
        >
          <Pencil className="size-4" /> Edit
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit menu item</DialogTitle>
            <DialogDescription>
              Update the details below. Leave images empty to keep the current
              ones. Choosing new images replaces all current images.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <AuthFormField
              id={`name-${item._id}`}
              name="itemName"
              label="Item Name"
              defaultValue={item.itemName}
              required
            />

            <Field>
              <FieldLabel htmlFor={`category-${item._id}`}>Category</FieldLabel>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as MenuCategory)}
              >
                <SelectTrigger id={`category-${item._id}`} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MENU_CATEGORIES.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor={`description-${item._id}`}>
                Description
              </FieldLabel>
              <Textarea
                id={`description-${item._id}`}
                name="description"
                defaultValue={item.description}
                rows={3}
                required
              />
            </Field>

            <AuthFormField
              id={`price-${item._id}`}
              name="price"
              type="number"
              min="0"
              step="0.01"
              label="Price"
              defaultValue={item.price}
              required
            />

            <AuthFormField
              id={`location-${item._id}`}
              name="location"
              label="Location (area / city)"
              defaultValue={item.location}
              required
            />

            <AuthFormField
              id={`images-${item._id}`}
              name="images"
              type="file"
              accept="image/*"
              multiple
              label="New images (optional)"
              description="Select one or more images. Leave empty to keep the current ones."
            />

            <DialogFooter>
              <Button type="submit" disabled={isSaving} className="w-full">
                {isSaving && <Loader2 className="animate-spin" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* AVAILABILITY — toggle between approved and inactive */}
      {canToggleAvailability && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleAvailability}
          disabled={isSaving}
          title={isAvailable ? "Hide from customers" : "Show to customers"}
        >
          {isAvailable ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
          {isAvailable ? "Hide" : "Show"}
        </Button>
      )}

      {/* DELETE — asks for confirmation first */}
      <AlertDialog>
        <AlertDialogTrigger
          render={<Button variant="destructive" size="sm" disabled={isSaving} />}
        >
          <Trash2 className="size-4" /> Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this menu item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove &quot;{item.itemName}&quot;. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isSaving}>
              {isSaving && <Loader2 className="animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
