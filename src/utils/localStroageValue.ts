// localStorageUtils.ts

/**
 * Sets a value in local storage as uneditable.
 * If the value has already been set as uneditable, it won't be changed.
 *
 * @param key - The key under which the value is stored.
 * @param value - The value to be stored in local storage.
 */
export const setUneditableValue = (key: string, value: string): void => {
  const isEditable = localStorage.getItem(`${key}_editable`);

  // Only set the value if it has not been marked as uneditable
  if (!isEditable) {
    localStorage.setItem(key, value);
    localStorage.setItem(`${key}_editable`, "false"); // Mark as uneditable
  }
};

/**
 * Gets a value from local storage if it is uneditable.
 *
 * @param key - The key under which the value is stored.
 * @returns The value if it is uneditable, otherwise null.
 */
export const getUneditableValue = (key: string): string | null => {
  const value = localStorage.getItem(key);
  const isEditable = localStorage.getItem(`${key}_editable`);

  // Return the stored value only if it is marked as uneditable
  return isEditable === "false" ? value : null;
};

/**
 * Resets the editable status of a value in local storage.
 * This will remove the uneditable flag, allowing the value to be changed.
 *
 * @param key - The key under which the value is stored.
 */
export const resetUneditableValue = (key: string): void => {
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_editable`);
};
