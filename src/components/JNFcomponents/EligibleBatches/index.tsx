import React from 'react'
import styles from './JNFForm.module.scss'
import Util from './Util'

export default function EligibleBatches({
  parentState,
  handleParentStateChange,
}: {
  parentState: any
  handleParentStateChange: React.Dispatch<any>
}) {
  const BTechBranches = [
    { fullName: 'Computer Science & Engineering', shortName: 'cse' },
    { fullName: 'Electronics & Communication Engineering', shortName: 'ece' },
    { fullName: 'Electrical Engineering', shortName: 'ee' },
    { fullName: 'Mechanical Engineering', shortName: 'me' },
    { fullName: 'Civil Engineering', shortName: 'ce' },
    { fullName: 'Chemical Engineering', shortName: 'che' },
    { fullName: 'Engineering Physics', shortName: 'ep' },
    { fullName: 'Material Science and Engineering', shortName: 'material' },
    { fullName: 'Mathematics and Computing', shortName: 'math' },
  ]

  const DualDegreeBranches = [
    { fullName: 'Computer Science & Engineering', shortName: 'cse' },
    { fullName: 'Electronics & Communication Engineering', shortName: 'ece' },
  ]

  const BArchBranches = [{ fullName: 'Architecture', shortName: 'arch' }]

  const MArchBranches = [{ fullName: 'Sustainable Architecture', shortName: 'sustarch' }]

  const MTechBranches = {
    CivilEngineering: [
      { fullName: 'Environment', shortName: 'env' },
      { fullName: 'Geotechnical', shortName: 'geo' },
      { fullName: 'Structures', shortName: 'str' },
      { fullName: 'Transportation', shortName: 'trans' },
      { fullName: 'Water Resources', shortName: 'water' },
    ],
    ComputerScienceEngineering: [
      { fullName: 'Computer Science & Engineering (Artificial Intelligence)', shortName: 'cse-ai' },
      { fullName: 'Computer Science & Engineering', shortName: 'cse' },
    ],
    CenterforEnergyStudies: [{ fullName: 'Energy Technology', shortName: 'energy' }],
    ChemicalEngineering: [{ fullName: 'Chemical Engineering', shortName: 'chem' }],
    ElectricalEngineering: [
      { fullName: 'Condition Monitoring of Power Apparatus', shortName: 'power-condition' },
      { fullName: 'Power System', shortName: 'power-system' },
      { fullName: 'Signal Processing & Control', shortName: 'signal-control' },
    ],
    ElectronicsCommunicationEngineering: [
      { fullName: 'Communication System & Networks', shortName: 'commsys' },
      { fullName: 'VLSI Design', shortName: 'vlsi' },
    ],
    MaterialScienceEngineering: [
      { fullName: 'Material Science & Engineering', shortName: 'material' },
    ],
    MechanicalEngineering: [
      { fullName: 'Design', shortName: 'design' },
      { fullName: 'Manufacturing', shortName: 'manufacturing' },
      { fullName: 'Thermal', shortName: 'thermal' },
    ],
  }

  const MBA = [
    { fullName: 'Marketing Management', shortName: 'marketing' },
    { fullName: 'Operations Management', shortName: 'operations' },
    { fullName: 'Financial Management', shortName: 'financial' },
    { fullName: 'Human Resource Management', shortName: 'hr' },
  ]

  const MSc = [
    { fullName: 'Mathematics & Computing', shortName: 'math-comp' },
    { fullName: 'Physics & Photonics Science', shortName: 'phy-photonics' },
  ]

  return (
    <div className={styles.form_comp}>
      <div className={styles.center}>Select Eligible Branches for Recruitment</div>
      <div className={`${styles.row_1} ${styles.main_heading}`}>
        <div className={`${styles.col} ${styles.col_1}`}>Sr No.</div>
        <div className={`${styles.col} ${styles.width}`}>Programs offered</div>
        <div className={`${styles.col_3}`}>
          <div className={`${styles.row}`}>
            <div className={styles.col_3_1}>Specialisation</div>
            <div className={styles.col_3_2}>
              {' '}
              <div>Yes/No</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>1</div>
        <div className={styles.col}>B. Tech. disciplines to be considered (4-year course)</div>
        <div className={`${styles.col_3}`}>
          {BTechBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.even}`}>
        <div className={`${styles.col} ${styles.col_1}`}>2</div>
        <div className={styles.col}>Dual Degree (5-year course)</div>
        <div className={`${styles.col_3}`}>
          {DualDegreeBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>3</div>
        <div className={styles.col}>B.Arch (5-year course)</div>
        <div className={`${styles.col_3}`}>
          {BArchBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.even}`}>
        <div className={`${styles.col} ${styles.col_1}`}>4</div>
        <div className={styles.col}>M.Arch (2-year course)</div>
        <div className={`${styles.col_3}`}>
          {MArchBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>5</div>
        <div className={styles.col}>M.Tech (2-year course)</div>
        <div className={`${styles.col_3}`}>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Civil Engineering</div>
          </div>
          <div>
            {MTechBranches.CivilEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Computer Science & Engineering</div>
          </div>
          <div>
            {MTechBranches.ComputerScienceEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Center for Energy Studies</div>
          </div>
          <div>
            {MTechBranches.CenterforEnergyStudies.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
          <div>
            <div className={`${styles.dept_heading}`}>Chemical Engineering</div>
          </div>
          <div>
            {MTechBranches.ChemicalEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Electrical Engineering</div>
          </div>
          <div>
            {MTechBranches.ElectricalEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Electronics & Communication Engineering</div>
          </div>
          <div>
            {MTechBranches.ElectronicsCommunicationEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Material Science & Engineering</div>
          </div>
          <div>
            {MTechBranches.MaterialScienceEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Mechanical Engineering</div>
          </div>

          <div>
            {MTechBranches.MechanicalEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.even}`}>
        <div className={`${styles.col} ${styles.col_1}`}>6</div>
        <div className={styles.col}>Master of Business Administration</div>

        <div>
          {MBA.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>
      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>7</div>
        <div className={styles.col}>M. Sc(2-year course)</div>

        <div>
          {MSc.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>
    </div>
  )
}
