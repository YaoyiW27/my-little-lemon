export const fetchAPI = async (date) => {
    // simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00"];
        resolve(availableTimes);
      }, 1000);
    });
  };
  
  export const submitAPI = async (formData) => {
    // simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };