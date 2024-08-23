import "./ReadingStatusRadioButton.styles.css";

const ReadingStatusRadioButton = () => {
  return (
    <div id="form-wrapper">
      <form action="/p/quote.php" method="GET">
        <div id="reading-status-slider">
          <input type="radio" name="debt-amount" id="1" value="1" required />
          <label htmlFor="1" data-debt-amount="Want to Read"></label>
          <input type="radio" name="debt-amount" id="2" value="2" required />
          <label htmlFor="2" data-debt-amount="Reading"></label>
          <input type="radio" name="debt-amount" id="3" value="3" required />
          <label htmlFor="3" data-debt-amount="Read"></label>
          <input type="radio" name="debt-amount" id="4" value="4" required />
          <label htmlFor="4" data-debt-amount="Re Reading"></label>
          <input type="radio" name="debt-amount" id="5" value="5" required />
          <label htmlFor="5" data-debt-amount="DNF"></label>
          <div id="debt-amount-pos"></div>
        </div>
      </form>
    </div>
  );
};

export default ReadingStatusRadioButton;
