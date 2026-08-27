# Third-Party Data and Licensing

Every external dataset must have a row in
`data/licenses/data_licenses.csv` before its first public render. A citation is
not a license, and a source being publicly accessible does not by itself allow
redistribution.

## Required checks

1. Identify the dataset owner and canonical landing page.
2. Record the exact license and license URL. If either is unclear, mark the row
   `needs_review` and do not redistribute the data.
3. Record whether attribution, share-alike, non-commercial, or no-derivatives
   terms apply.
4. Distinguish facts manually transcribed for quotation or analysis from a
   redistributed dataset.
5. Preserve the source's requested citation and access date.
6. Recheck living datasets before each release.

## Allowed statuses

- `cleared`: terms reviewed and compatible with the recorded use.
- `citation_only`: source may be cited; dataset is not redistributed.
- `needs_review`: exact terms or intended use remain unresolved.
- `prohibited`: intended use conflicts with the terms.

The initial registry records known source-level terms and conservative
citation-only defaults. It does not authorize new data reuse without a row-level
review.

