module.exports = {
    calculateFee: function(entryTime, currentTime) {
      const freeHours = 2;
      const hourlyRate = 10; // Stabilim un tarif de 10 euro pe oră
  
      const diffInMilliseconds = currentTime - entryTime;
      const diffInHours = Math.ceil(diffInMilliseconds / (1000 * 60 * 60));
  
      if (diffInHours <= freeHours) {
        return 0;
      }
      return (diffInHours - freeHours) * hourlyRate;
    }
  };
  