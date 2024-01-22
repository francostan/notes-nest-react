export const countryCodes = [
  { value: "+54", label: "+54 (Argentina)" },
  { value: "+55", label: "+55 (Brasil)" },
  { value: "+56", label: "+56 (Chile)" },
  { value: "+57", label: "+57 (Colombia)" },
  { value: "+58", label: "+58 (Venezuela)" },
  { value: "+51", label: "+51 (Perú)" },
  { value: "+52", label: "+52 (México)" },
  { value: "+53", label: "+53 (Cuba)" },
  { value: "+593", label: "+593 (Ecuador)" },
  { value: "+592", label: "+592 (Guyana)" },
  { value: "+595", label: "+595 (Paraguay)" },
  { value: "+598", label: "+598 (Uruguay)" },
  { value: "+591", label: "+591 (Bolivia)" },
  { value: "+507", label: "+507 (Panamá)" },
  { value: "+504", label: "+504 (Honduras)" },
  { value: "+502", label: "+502 (Guatemala)" },
  { value: "+503", label: "+503 (El Salvador)" },
  { value: "+504", label: "+504 (Nicaragua)" },
  { value: "+506", label: "+506 (Costa Rica)" },
  { value: "+509", label: "+509 (Haití)" },
];

export const getNotesFetch = async (email) => {
  try {
    const response = await fetch(
      `https://back-resolver-stanziola.cyclic.app/notes/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error(error);
  }
};

export const generatePages = (objects, elements) => {
  const elementsPerPage = elements || 5;

  if (objects.length > 0) {
    return objects.length % elementsPerPage === 0
      ? parseInt(objects.length / elementsPerPage)
      : parseInt(objects.length / elementsPerPage) + 1;
  } else return 0;
};

export const filterAndGetByValue = (
  valueFromSearch,
  arrayItems,
  propertyToFilterBy
) => {
  console.log(valueFromSearch, arrayItems, propertyToFilterBy);
  let filteredItems = [];
  if (arrayItems.length > 0 && valueFromSearch) {
    filteredItems = arrayItems.filter((item) => {
      const compareItem = item[propertyToFilterBy];
      if (Array.isArray(compareItem)) {
        console.log(compareItem);
        return compareItem.some((tagOrCategory) =>
          tagOrCategory.toLowerCase().includes(valueFromSearch.toLowerCase())
        );
      } else if (typeof compareItem === "boolean") {
        const valueToCompare = valueFromSearch === "archived"? false : true;
        return compareItem === valueToCompare;
      } else return compareItem;
    });
  }
  return filteredItems;
};

export const isAdmin = async (id) => {
  try {
    const response = await fetch(`/api/user/isAdmin?id=${id}`);
    const isAdmin = await response.json();
    return isAdmin;
  } catch (error) {
    console.error(error);
  }
};

export const findOneById = async (id) => {
  try {
    const response = await fetch(`/api/user/findById?id=${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const updateOne = async (note, id) => {
  try {
    const response = await fetch(
      `https://back-resolver-stanziola.cyclic.app/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }
    );
    const editedNote = await response.json();
    return editedNote;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOne = async (id) => {
  try {
    const response = await fetch(
      `https://back-resolver-stanziola.cyclic.app/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedNote = await response.json();
    return deletedNote;
  } catch (error) {
    console.error(error);
  }
};

export const addOne = async (note) => {
  try {
    const response = await fetch(
      "https://back-resolver-stanziola.cyclic.app/notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }
    );
    const addedNote = await response.json();
    return addedNote;
  } catch (error) {
    console.error(error);
  }
};

export const modelUser = (data) => {
  const user = {};
  user.name = data.user.user_metadata.name;
  user.email = data.user.email;
  user.phone = data.user.user_metadata.phone;
  return user;
};
