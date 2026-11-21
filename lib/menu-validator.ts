// Returns an error message, or null if the menu item values are valid.
export function getMenuItemError(values: {
  itemName: string
  description: string
  price: number
  location: string
  imageFile: File | null
}): string | null {
  if (values.itemName.trim().length < 3) {
    return "Item name must be at least 3 characters."
  }
  if (values.description.trim().length < 10) {
    return "Description must be at least 10 characters."
  }
  if (!(values.price > 0)) {
    return "Price must be greater than 0."
  }
  if (values.location.trim().length < 2) {
    return "Please enter the location (area or city)."
  }
  if (!values.imageFile || values.imageFile.size === 0) {
    return "Please upload an item image."
  }
  return null
}
