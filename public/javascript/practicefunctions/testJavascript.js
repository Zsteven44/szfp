function lowercaseCount(str){
    if (str.match(/[a-z]/g) != null) {
      return str.match(/[a-z]/g).length;
    } else {
      return 0;
    }
    // This will count the lowercase characters in a passed string.
}