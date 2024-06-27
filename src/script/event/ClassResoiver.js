const ClassNameProcessor = () => {

   const getClassName = (element) => {
      const className = element.className;

      return convertToClassName(className);
   }

   const convertToClassName = (className) => {
     return className;
   }

   return {
     getClassName
   }
}

export default ClassNameProcessor;