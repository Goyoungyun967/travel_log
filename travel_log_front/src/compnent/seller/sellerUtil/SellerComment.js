const SellerComment = () => {
  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Textarea
          placeholder="Try to submit with no text!"
          required
          sx={{ mb: 1 }}
        />
        <Textarea placeholder="It is disabled" disabled sx={{ mb: 1 }} />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default SellerComment;
